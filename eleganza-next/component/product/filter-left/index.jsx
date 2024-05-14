import styles from './filter-left.module.scss'
import FilterBrand from './filter-cate/filter-brand.jsx'
import FilterMaterial from './filter-cate/filter-material.jsx'
import FilterSize from './filter-cate/filter-size'

export default function FilterLeft({
  products,
  checkboxStatus,
  handleCheckboxStatus,
  productCate,
}) {
  const repeat = new Set()
  const sortCate = ['頂板', '側板', '指板', '琴頸']
  const queryParams = []
  console.log(queryParams)

  // filter查詢字串 => 用陣列取值並轉換為查詢字串 這個真的幹你娘超複雜

  // 取出key值
  // 判斷key的布林值
  // 判斷key值屬於哪個欄位
  // key值為true加入陣列，反之則移除
  // 將處理過後的key值加入查詢字串

  const addedKeys = new Set()
  const filterKeys = Object.entries(checkboxStatus)
  console.log(filterKeys)
  filterKeys.forEach(([key, value]) => {
    products.forEach((product) => {
      if (addedKeys.has(key)) {
        return
      }
      if (product.brand === key && value === true) {
        addedKeys.add(key)
        queryParams.push(`brand=${key}`)

      } else if (product.size == key && value === true) {
        addedKeys.add(key)
        queryParams.push(`size=${key}`)



        // 這邊需要轉換為case
      } else if (product.top == key.replace(/\d/g, '') && value === true) {
        let formattedKey = key.replace(/\d/g, '')
        addedKeys.add(key)
        queryParams.push(`top=${formattedKey}`)

      } else if (
        product.back_and_sides == key.replace(/\d/g, '') &&
        value === true
      ) {
        const formattedKey = key.replace(/\d/g, '')
        addedKeys.add(key)
        queryParams.push(`back_and_sides=${formattedKey}`)

      } else if (product.neck == key.replace(/\d/g, '') && value === true) {
        const formattedKey = key.replace(/\d/g, '')
        addedKeys.add(key)
        queryParams.push(`neck=${formattedKey}`)

      } else if (
        product.fingerboard == key.replace(/\d/g, '') &&
        value === true
      ) {
        const formattedKey = key.replace(/\d/g, '')
        addedKeys.add(key)
        queryParams.push(`fingerboard=${formattedKey}`)
      }
    })
  })

  console.log(queryParams)

  // 向後端發送請求
  // 查詢字串示例:
  // http://localhost:3005/api/products?brand=Karl%Höfner,Artino&size=4&top=楓木

  //   console.log(checkboxStatus)

  const renderBrandFilter = () => {
    return (
      <div className={styles['filter-option']}>
        <div className={styles['option-name']}>品牌</div>

        {/* 確保在對象存在時才執行某些操作 */}
        {products &&
          products.map((product, i) => {
            // 解構附值
            const { brand } = product
            if (!repeat.has(product.brand)) {
              repeat.add(product.brand)
              return (
                <FilterBrand
                  value={brand}
                  key={brand}
                  brand={brand}
                  checkboxStatus={checkboxStatus[brand] || false}
                  handleCheckboxStatus={() => handleCheckboxStatus(brand)}
                />
              )
            }
          })}
        {/* <div>
            <img className="mb-1" src="/public/icons/icon-plus.svg" alt="" />{' '}
            顯示更多
          </div> */}
      </div>
    )
  }

  const renderSizeFilter = () => {
    return (
      <div className={styles['filter-option']}>
        <div className={styles['option-name']}>尺寸</div>
        {products &&
          products.map((product, index) => {
            // 解構附值
            const { size } = product
            if (!repeat.has(product.size) && product.size) {
              repeat.add(product.size)
              return (
                <FilterSize
                  value={size}
                  key={size}
                  index={index}
                  size={size}
                  checkboxStatus={checkboxStatus[size] || false}
                  handleCheckboxStatus={() => handleCheckboxStatus(size)}
                />
              )
            }
          })}
      </div>
    )
  }

  const renderMaterialFilter = () => {
    return (
      <div className={styles['filter-option']}>
        <div className={styles['option-name']}>材質</div>
        {products &&
          sortCate.map((sortName, index) => {
            return (
              <FilterMaterial
                key={sortName}
                products={products}
                sortName={sortName}
                index={index}
                checkboxStatus={checkboxStatus}
                handleCheckboxStatus={handleCheckboxStatus}
              />
            )
          })}
      </div>
    )
  }

  return (
    <>
      <div className={styles['filter-left']}>
        {renderBrandFilter()}
        {productCate == 0 ? renderSizeFilter() : null}
        {productCate == 0 ? renderMaterialFilter() : null}
      </div>
    </>
  )
}
