import eleganza from '../shopping_cart/CSS/eleganza.module.css'

const Login = () => {
  return (
    <>
  <title>Title</title>
  {/* Required meta tags */}
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  {/* Bootstrap CSS v5.2.1 */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Noto+Sans+TC:wght@100..900&family=Noto+Serif+TC&family=Playfair+Display+SC:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossOrigin="anonymous"
  />

  <style dangerouslySetInnerHTML={{ __html: "\n      \n\n\n      \n   " }} />
  {/* header */}
  <header>
    {/* main */}
    <main className="wrap flex-grow-1">
      {/* ------------------頁面內容------------------------ */}
      <div className={`${eleganza['empty-cart-container']}`}>
        <section>
          <p className={`${eleganza['empty-cart-message']}`}>請登入帳號</p>
          <a href="http://localhost:3000/login1" className={`${eleganza['shop-now-button']}`}>
            前往登入
          </a>
        </section>
      </div>
    </main>
  </header>
</>
  );
};

export default Login;
