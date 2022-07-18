# 🟢 Intro

Buttons behave weird.

Lets look at current button features. Active state, focus state.

Some weirdness:

- long press on mobile: select text, scroll window. Even selecting text outside of press can select button, probably not what we want.
- Can't cancel tap or press

# 🟢 Step

Let's fix the text selection. Easy: tw class `select-none`.

# 🟢 Step

Now the scrolling. Another easy one, `touch-none`

# 🟢 Step

Ok, want to improve the clicking/pressing here a bit. If users cancel a press, we want to give them visual feedback. Both on mobile and desktop. Also if we select w keyboard we can press Space (which shows active class) or Enter, which doesn't. Also, if Space is held it only triggers once, whereas Enter repeat clicks the button. Browsers don't all handle this consistently, either. So we want ot normalize this.

This is where we are going to bring in useButton from React Aria. There's also a usePress that has this but useButton is better since we're building a button.

Looking at the example, we need useRef and useButton... spread in.

```jsx
function Button({ onClick, children }) {
  let ref = useRef();
  let { buttonProps } = useButton({ onClick }, ref);

  return (
    <button
      ref={ref}
      {...buttonProps}
      className={`h-20 w-20 touch-none select-none rounded-full bg-[#353336] text-[40px] text-white focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-offset-black active:bg-[#757376]`}
    >
      {children}
    </button>
  );
}
```

Right away see a few changes. First, we see focus rings on click, but second, we see we've actually broken our keyboard interactivity. We can't actually click a button anymore with space or enter.

So let's fix our keyboard interactivity first, and the way we'll do this is with onPress. So if we map our onClick to onPress, we'll see keyboard works again. Not only that, the behavior of Space and Enter is the same – we can hold it down and only trigger it once.

Now we've lost our active state with the keyboard interactions. We still see it with the mouse click, but not with keyboard. Again because of browser issues we don't want to rely on the `active` pseudo-class.

Fortunately `useButton` gives us a `isPressed` boolean. Use that to conditionally apply classes:

```
isPressed ? "bg-[#757376]" : "bg-[#353336]"
```

Boom – works for mouse as well as Space and Enter. Not only that, check it out – isPressed is false if we drag out and aren't pressing the button anymore, that is if we're about to cancel the press.

Much better and more like native buttons.

# 🟢 Step

Ok let's revisit this focus issue. We're using the CSS focus-visible pseudo-class via these css classes, but it looks like focus-visible is getting triggered even when we use the mouse (which is not how focus-visible is supposed to work). The reason is, is because useButton actually programatically focuses our button when appropriate using JavaScript. Again they go into more detail in the blog posts you can find in the description, but the tl;dr is the focus and focus-visible pseudo-classes don't behave consistently across browsers and input devices – they even mention that iOS sometimes blurs elements asynchronously after they're interacted with!

So, React Aria uses JavaScript for programmatic focus management, and it turns out (at least in chrome on desktop here and on iOS) the focus-visible pseudo-class is applied when an element is focused via javascript. So, we don't want to use focus-visible to apply these visual focus rings.

Fortunately, React Aria has our back here with a component that's aware of the focus state – it's called FocusRing. We just wrap our button in it and get some props: `focusRingClass` lets us apply classes when our button is focused via the keyboard.

```jsx
<FocusRing focusRingClass="ring">
  <button />
</FocusRing>
```

Copy over original treatment:

```jsx
<FocusRing focusRingClass="ring ring-offset-2 ring-offset-black" />
```

Looks good – also don't see those focus rings on mobile.

# 🟢 Step

Ok – we've got one last step, and it's the one that led me down this entire journey to begin with. Let me show you.

If we tap long enough on the button, we get great feedback on the pressed state. But what if we tap quickly? Look, there's no feedback. Only the fact that the numbers changed. Put in 888, now I don't know if I clicked it. Contrived example but you get the point.

Same over here on Mobile.

So this is what I wanted to fix. I wanted to have a nice satisfying animation when the press event actually occurred, just like it does throughout most of iOS, and especially the calculator app, where it's not ambiguous at all whether you've tapped the button.

This is where Framer Motion comes in. Let's come down and turn this button into a motion.button.

Now. When I started this, I was trying to figure out how to use Framer Motion's high-level declarative APIs to kick off this animation – initial/animate, this is normally how you use Framer Motion. But one level down there's something called animation controls

```js
let controls = useAnimation();
```

pass it in

```jsx
animate = { controls };
```

and now we can trigger animations on press!

```js
let { buttonProps, isPressed } = useButton(
  {
    onPress() {
      onClick();
      controls.start({
        background: ["#757376", "#353336"],
      });
    },
  },
  ref
);
```

Pretty rad.

However – look what happens when I press a button we've clicked. We've lost our isPressed state. it works when clicking a button for the first time, but not after we click it. That's because FM sets inline styles, which take precedence over css classes. We also can't interrupt – if we start a new press it works but if we just press and hold during animation, doesn't work.

Let's move our isPressed logic to FM, starting with onPressStart. We don't want to animate so we'll use `controls.set` instead of `controls.start`:

```js
onPressStart: () => {
  controls.set({ background: "#757376" });
};
```

Works after animation but doesn't interrupt – to do that we can use `controls.stop()` to stop any currently running animations:

```js
onPressStart: () => {
  controls.stop();
  controls.set({ background: "#757376" });
};
```

Nice. Finally, to bring back our drag-off behavior we can use `onPressEnd` and copy over the onPress animation:

```jsx
onPressEnd: () => {
  controls.start({
    background: "#353336",
  });
},
```

It's faster since it's only animating one prop so let's add a duration to it.

```jsx
onPressEnd: () => {
  controls.start({
    background: "#353336",
    transition: { duration: 0.4 },
  });
},
```

Ok, looking great!!

There's one more trick we can do. For our onPress animation, we don't have to animate to the highlight color anymore, since we're setting it in onPressStart. In FM if you pass `null` to the first keyframe of an animation, it will use that as the starting value.

So let's change the first element here to null:

```js
onPress: () => {
  onClick();
  controls.start({
    background: [null, "#353336"],
  });
},
```

And finally let's add in a transition so these two match perfectly:

```jsx
onPress: () => {
  onClick();
  controls.start({
    background: [null, "#353336"],
    transition: { duration: 0.4 },
  });
};
```

Now to clean up we don't need this `isPressed` conditional logic anymore. SO we can remove this and add back in our starting bg color: `bg-[#353336]`.

Check on desktop, mouse is great. Keyboard, great. Now mobile. Bit of a flicker here. One last thing we need, this is actually coming from the webkit tap highlight color css property. Since we're implementing this all our own let's set this to transparent.

```jsx
style={{
  WebkitTapHighlightColor: "transparent",
}}
```

And now it looks great!

Let's try it on the device and compare to the calculator.
