document.addEventListener("DOMContentLoaded", function() {
    // 透過 Fetch API 取得文章資料（請根據實際資料來源調整 URL）
    fetch('/data/articles.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then(articles => {
        // 取得最新的五篇文章，假設 JSON 資料已依日期排序(由新到舊)
        const latestFive = articles.slice(0, 5);
        const container = document.getElementById('latest-posts');
  
        latestFive.forEach(article => {
          // 建立文章卡片
          const articleElement = document.createElement('article');
          articleElement.classList.add('post-card');
          // 利用 <a> 標籤包覆所有內容，並以 article.url 作為連結目標
          articleElement.innerHTML = `
            <a href="${article.url}" class="article-link">
              <h3>${article.title}</h3>
              <p>${article.summary}</p>
              <small>${new Date(article.date).toLocaleDateString('zh-TW')}</small>
            </a>
          `;
          container.appendChild(articleElement);
        });
      })
      .catch(error => {
        console.error("取得文章資料時出錯:", error);
      });
  });