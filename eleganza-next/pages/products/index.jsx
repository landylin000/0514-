import ProductCard from '@/component/product/card/product-card'
import FilterLeft from '@/component/product/filter-left'
import NavTop from '@/component/product/nav-top'
import Pagination from '@/component/product/pagination'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Products() {
  const [products, setProducts] = useState([])
  const getProduct = async () => {
    const url = 'http://localhost:3005/api/products'

    try {
      const res = await fetch(url)
      const data = await res.json()
      // console.log(data)

      if (Array.isArray(data.data.products)) {
        setProducts(data.data.products)
        //   console.log('success')
        //   console.log(products)
      } else {
        alert('u mom is dead')
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getProduct()
  }, [])

  // 篩選checkbox 父元素提升
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const handleCheckboxStatus = (option) => {
    setCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [option]: !prevStatus[option],
    }))
  }

  // 商品類別篩選 父元素提升
  const [productCate, setProductCate] = useState(0)
  const cates = ['小提琴', '提琴盒', '提琴弓', '松香']

  return (
    <>
      <NavTop
        setProducts={setProducts}
        products={products}
        checkboxStatus={checkboxStatus}
        handleCheckboxStatus={handleCheckboxStatus}
        setCheckboxStatus={setCheckboxStatus}
        productCate={productCate}
        setProductCate={setProductCate}
        cates={cates}
      />
      <div className="products">
        <div className="row justify-content-between">
          <div className="col-3 d-none d-md-block">
            <FilterLeft
              products={products}
              checkboxStatus={checkboxStatus}
              handleCheckboxStatus={handleCheckboxStatus}
              productCate={productCate}
            />
          </div>
          <div className="col col-md-9">
            <div className="row g-3 g-xl-4 row-cols-2 row-cols-sm-3 row-cols-xl-4">
              {products.map((product) => {
                const { name, brand, product_price, img } = product
                return (
                  <div className="col" key={product.product_id}>
                    <Link href={`/products/${product.product_id}`}>
                      <ProductCard
                        name={name}
                        brand={brand}
                        price={product_price}
                        img={img}
                      />
                    </Link>
                  </div>
                )
              })}
            </div>
            <Pagination />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .products {
            margin-bottom: 40px;
            @media screen and (min-width: 768px) {
              margin-bottom: 0;
            }
          }
        `}
      </style>
    </>
  )
}
