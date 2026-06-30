Use Tag for categories, active filters, and selected multi-choice items. Add `onDismiss` to make it removable.

```jsx
<Tag>Tech</Tag>
<Tag color="primary">Conference</Tag>
<Tag color="gold">Featured</Tag>
<Tag onDismiss={() => removeTag('networking')}>Networking</Tag>
<Tag color="primary" onDismiss={() => clearFilter()}>Paris</Tag>
```

**Colors:** `default` (grey) · `primary` (blue tint) · `gold` (amber tint)
**Dismissible:** Pass `onDismiss` callback — renders a × button that appears on hover.
**Use with:** Filter bars, category selectors, attendee interest tags, topic chips.
