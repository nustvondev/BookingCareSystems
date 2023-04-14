import express from 'express';

export let configViewEngine = (app) => {
  app.use(express.static('../server/public'));
  app.set('view engine', 'ejs');
  app.set('views', '../server/views');
};
