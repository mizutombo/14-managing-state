(function(module) {
  var articlesController = {};

  Article.createTable();

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // It's in the middleware chain for /articles/:id. It gets
  //called before articlesController.index. Finds an article by
  //the params id and sets it to the context object as ctx.articles.
  // This method loads by the id and is called by the findWhere method.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is in the middleware chain for /author/:authorName.
  // Finds an article by the params 'author' and sets it to the context
  // object as ctx.articles.
  // This loads by the author and is called by the findWhere method.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is in the middleware chain for /category/:categoryName.
  // Finds an article by the params category and sets it to ctx.articles.
  // This loads by the category and is called by the findWhere method.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is in the middleware chain for the index page.
  // Finds all articles and sets them to the ctx.articles if we
  // have an array length for Article.all. Otherwise, it uses
  // articleData as the callback function for Article.fetchAll.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
