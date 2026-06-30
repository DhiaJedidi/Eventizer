Use Input for text entry in forms — registration, event creation, search, etc.

```jsx
<Input label="Event Name" placeholder="e.g. Tech Summit 2026" required />
<Input label="Email" type="email" helperText="We'll send confirmation to this address" />
<Input label="Location" error="Please enter a valid venue name" value="..." />
<Input label="Capacity" type="number" disabled value="500" />
```

**States:** default · focused (blue border) · error (red border + message) · disabled (grey bg, 60% opacity)
**Label:** Rendered uppercase with wide letter-spacing. Required fields show a red asterisk.
**Note:** Pass `error` prop to show an error message; it replaces `helperText` visually.
