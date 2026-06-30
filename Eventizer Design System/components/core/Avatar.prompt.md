Use Avatar to represent users, organizers, or speakers. Background color is deterministically derived from the name.

```jsx
<Avatar name="Sophie Martin" size="md" />
<Avatar name="Alexandre Dupont" size="lg" />
<Avatar src="/profile.jpg" name="Sophie Martin" size="sm" />
<Avatar size="xs" />  {/* unknown user — shows '?' */}
<Avatar name="Event Org" shape="square" size="md" />
```

**Sizes:** `xs` (24px) · `sm` (32px) · `md` (40px) · `lg` (48px) · `xl` (64px)
**Shapes:** `circle` (default) · `square` (uses card radius 16px)
**Colors:** Cycles through 6 brand-harmonious colors based on the first character of `name`.
