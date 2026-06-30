Use Badge to display compact status labels, counts, or categories. Always uppercase with wide letter-spacing.

```jsx
<Badge variant="success">Published</Badge>
<Badge variant="warning">Draft</Badge>
<Badge variant="danger">Cancelled</Badge>
<Badge variant="info">Live</Badge>
<Badge variant="primary">Featured</Badge>
<Badge variant="secondary">New</Badge>
<Badge variant="default">Past</Badge>
<Badge size="sm">Sold Out</Badge>
```

**Variants:** `default` · `primary` (blue) · `secondary` (gold) · `success` · `warning` · `danger` · `info`
**Event status mapping:** Published → `success` · Draft → `warning` · Cancelled → `danger` · Live → `info` · Past → `default`
