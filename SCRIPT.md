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
