export function CmsRichText({ as: Tag = "div", html, fallback, className = "" }) {
  const value = String(html || "").trim();

  const classes = `cms-rendered-content ck-content ${className}`.trim();
  if (!value) return <Tag className={classes}>{fallback}</Tag>;
  if (!/<[a-z][\s\S]*>/i.test(value)) {
    return <Tag className={classes}>{value}</Tag>;
  }

  return (
    <Tag
      className={classes}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export const cmsButtonProps = (settings, key, defaults = {}) => ({
  href: settings?.[`${key}Url`] || defaults.href || "#",
  style: {
    ...(defaults.style || {}),
    ...(settings?.[`${key}Color`]
      ? { backgroundColor: settings[`${key}Color`] }
      : {}),
    ...(settings?.[`${key}TextColor`]
      ? { color: settings[`${key}TextColor`] }
      : {}),
  },
});
