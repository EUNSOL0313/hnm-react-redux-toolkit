import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faShop } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetail } from '../redux/reducers/productSlice'

const ProductDetail = () => {
   let { id } = useParams()
   const product = useSelector((state) => state.product.selectedItem)
   const dispatch = useDispatch()

   const getProductDetail = async () => {
      dispatch(fetchProductDetail(id))
   }

   useEffect(() => {
      getProductDetail()
   }, [id])

   return (
      <div className="productDetail-wrap">
         <Container>
            <Row>
               <Col lg="5" className="product-img">
                  <img src={product?.img} alt={product?.title} />
               </Col>
               <Col lg="7" className="product-info">
                  <div className="name ">{product?.title}</div>
                  <div className="price ">₩ {product?.price}</div>
                  <div className="choice ">{product?.choice == true ? 'Conscious choice' : ''}</div>
                  <ul className="size">
                     {product?.size.map((item, index) => (
                        <li key={index}>{item}</li>
                     ))}
                  </ul>
                  <div className="add-button">
                     <FontAwesomeIcon icon={faCartShopping} /> <span>추가</span>
                  </div>

                  <ul className="shop-info">
                     <li>
                        <FontAwesomeIcon icon={faShop} />
                        <span>매장별 제품 찾기</span>
                     </li>
                     <li>
                        <i className="xi-error-o"></i>
                        배송기간 : 영업일 기준 2~3일
                     </li>
                  </ul>

                  <ul className="detail-guide">
                     <li>설명&핏</li>
                     <li>소재</li>
                     <li>케어가이드</li>
                  </ul>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default ProductDetail
