# Requirements

- Tap, animate press
- While press, active state
- While press and drag off, inactive state
- While press and let go on button, click
- While press and drag off and let go, no click
- While press, can't scroll page
- Press doesn't trigger text highlight or spyglass

# Todo mentions:

- Hold spacebar

- touch action none

- [On focus-visible](https://react-spectrum.adobe.com/blog/building-a-button-part-3.html):

In the future, the :focus-visible pseudo class in CSS may be able to replace this code. However, since the spec does not say when it should apply, browsers will likely implement different heuristics, which will mean it will behave inconsistently. Until browser support improves, the useFocusVisible and useFocusRing hooks in React Aria can be used to implement focus rings that work consistently across browsers.

it's because they preventDefault on mouse down and always focus programatically

safari and ios don't always focus buttons on mousedown, and sometimes ios even asynchronously blurs a button after onClick is fired

# Step

```jsx
export default function Home() {
  return (
    <div className="mt-16 text-center">
      <button className="rounded border border-gray-300 px-3 py-2">
        Click me
      </button>
    </div>
  );
}
```

Add hover, active. Gives us good treatment on desktop:

```
hover:bg-gray-100 active:bg-gray-200
```

But doesn't transfer to mobile.
