# Fonts — self-hosted (performance.md §8)

Place these **WOFF2** files here. No external font CDN is allowed. `@font-face`
declarations and the two `<link rel="preload">` tags reference these exact paths.

Required (only the weights actually used — design.md §4.1):

| File | Family / weight | Used by |
|---|---|---|
| `Montserrat-Bold.woff2` | Montserrat 700 | H1, section H2/H3 (preloaded) |
| `Montserrat-SemiBold.woff2` | Montserrat 600 | minor headings |
| `Poppins-Regular.woff2` | Poppins 400 | body copy (preloaded) |
| `Poppins-SemiBold.woff2` | Poppins 600 | labels, buttons, nav |

Subset to `latin` + `latin-ext` (covers French diacritics) to keep each file ≤ ~25KB:

```bash
pyftsubset Montserrat-Bold.ttf \
  --output-file=Montserrat-Bold.woff2 \
  --flavor=woff2 \
  --unicodes="U+0000-024F,U+1E00-1EFF"
```

Montserrat and Poppins are open-source (SIL OFL) — download from Google Fonts and
convert/subset locally. Do **not** load them from fonts.googleapis.com at runtime.
