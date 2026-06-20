declare const process: {
  env: {
    REACT_APP_TMDB_TOKEN?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
    GENERATE_SOURCEMAP?: string;
  };
};

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css';


