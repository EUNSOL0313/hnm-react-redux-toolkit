import React, { useEffect } from 'react'
import ProductCard from '../component/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
// import { productAction } from '../redux/actions/productAction'
import { fetchProducts } from '../redux/reducers/productSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProductAll = () => {
   const productList = useSelector((state) => state.product.productList)
   const [query, setQuery] = useSearchParams()
   const dispatch = useDispatch()
   const getProducts = () => {
      let searchQuery = query.get('q') || ''
      console.log('쿼리값은?', searchQuery)
      // let url = `http://localhost:4000/products?q=${searchQuery}`
      //dispatch(productAction.getProducts(searchQuery))
      dispatch(fetchProducts(searchQuery))
   }
   useEffect(() => {
      getProducts()
   }, [query])

   return (
      <div>
         <Container>
            <Row>
               {productList.map((menu) => (
                  <Col lg={3}>
                     <ProductCard item={menu} />
                  </Col>
               ))}
            </Row>
         </Container>
      </div>
   )
}

export default ProductAll
