// Progressive enhancement only. All content is plain server-rendered HTML —
// none of this is required to read or scrape the docs.

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      toggle.textContent = sidebar.classList.contains('open') ? 'Close' : 'Menu';
    });
    sidebar.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        sidebar.classList.remove('open');
        toggle.textContent = 'Menu';
      })
    );
  }

  // Highlight current page in the sidebar
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.toc a').forEach((a) => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  // Copy-to-clipboard buttons on every <pre>
  document.querySelectorAll('pre').forEach((pre) => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      const text = pre.querySelector('code')?.textContent ?? pre.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
      } catch {
        btn.textContent = 'Failed';
      }
      setTimeout(() => (btn.textContent = 'Copy'), 1500);
    });
    pre.appendChild(btn);
  });
});
