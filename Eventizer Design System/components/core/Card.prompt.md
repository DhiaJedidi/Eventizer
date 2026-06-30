Use Card as a general-purpose container for grouped content — event summaries, stats, panels, form sections.

```jsx
<Card padding="md">
  <h3>Tech Summit 2026</h3>
  <p>June 20 · Paris</p>
</Card>

<Card padding="lg" onClick={() => navigate('/event/1')}>
  <Badge variant="success">Published</Badge>
  <h4>Annual Developer Conference</h4>
</Card>

<Card padding="none" shadow={false}>
  <img src="cover.jpg" style={{ borderRadius: '16px 16px 0 0' }} />
  <div style={{ padding: 16 }}>...</div>
</Card>
```

**Padding options:** `none` · `sm` (8px) · `md` (16px) · `lg` (24px)
**Hover elevation:** Only activates when `onClick` is provided — safe to leave on non-interactive cards.
