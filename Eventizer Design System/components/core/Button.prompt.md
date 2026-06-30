Use Button for any user-initiated action — form submissions, navigation triggers, or dialog confirmations.

```jsx
<Button variant="primary" size="md" onClick={() => {}}>Create Event</Button>
<Button variant="secondary">Export Data</Button>
<Button variant="outline" size="sm">View Details</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="primary" disabled>Saving…</Button>
<Button variant="primary" fullWidth>Register Now</Button>
```

**Variants:** `primary` (blue fill) · `secondary` (gold fill) · `outline` (blue border) · `ghost` (no border)
**Sizes:** `sm` (32px) · `md` (40px) · `lg` (48px)
**Notes:** Labels use ALL CAPS via `letterSpacing` + `fontWeight: semibold`. Disabled state at 45% opacity. Hover/press states are handled internally via React state.
