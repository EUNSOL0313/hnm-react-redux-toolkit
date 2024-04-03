import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogout } from '../redux/reducers/authenticateSlice'

const Navbar = () => {
   const menuList = ['여성', 'Divided', '남성', '신생아/유아', '아동', 'H&M Home', 'Sale', '지속가능성']
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const authenticate = useSelector((state) => state.auth.authenticate)

   const [width, setWidth] = useState(0)
   const [inputVisible, setInputVisible] = useState(false)

   const goToLogin = () => {
      navigate('/login')
   }
   const goToLogout = () => {
      dispatch(fetchLogout())
      navigate('/')
   }
   const openSearchBox = () => {
      // 검색 상자 열고 닫는 함수
      setInputVisible(!inputVisible)
   }

   // const goToHome = () => {
   //    navigate('/')
   // }
   const search = (event) => {
      //console.log('key press')
      if (event.key === 'Enter') {
         //console.log('we click this key', event.key)
         //입력한 검색어를 읽어와서
         let keyword = event.target.value
         //console.log('keyword', keyword)

         //url을 바꿔준다. ?q=검색어(쿼리값)
         navigate(`/?q=${keyword}`)
      }
   }

   return (
      <div>
         <div className="side-menu" style={{ width: width }}>
            <button className="close-btn" onClick={() => setWidth(0)}>
               &times;
            </button>
            <div className="side-menu-list" id="menu-list">
               {menuList.map((menu, index) => (
                  <button key={index}>{menu}</button>
               ))}
            </div>
         </div>
         <div className="nav-header">
            <div className="burger-menu hide">
               <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
            </div>
            <div className="nav-rightSide">
               <div className="search-box">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={openSearchBox} /> {/* 검색 아이콘을 클릭하면 검색 상자를 연다 */}
                  {inputVisible && <input className="search-input" type="text" onKeyDown={(event) => search(event)} placeholder="제품검색" />}{' '}
                  {/* 검색 상자가 표시되면 입력 필드를 보여줌 */}
               </div>
               <div className="login-button" onClick={authenticate ? goToLogout : goToLogin}>
                  <FontAwesomeIcon icon={faUser} />
                  <span style={{ cursor: 'pointer' }}>{authenticate ? '로그아웃' : '로그인'}</span>
               </div>
            </div>
         </div>

         <div className="nav-section">
            <Link to="/">
               <img
                  className="logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png"
                  alt="H&M"
               />
               {/* onClick={goToHome} */}
            </Link>
         </div>

         <div className="menu-area">
            <ul className="menu-list">
               {menuList.map((menu) => (
                  <li>{menu}</li>
               ))}
            </ul>
            {/* <div className="search-box">
               <FontAwesomeIcon icon={faSearch} className="search-icon" />
               <input className="search-input" type="text" onKeyDown={(event) => search(event)} placeholder="제품검색" />
            </div> */}
         </div>
      </div>
   )
}

export default Navbar
