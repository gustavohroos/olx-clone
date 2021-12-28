import React from "react"
import './App.css'
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes"
import { Template } from "./components/MainComponents"
import Header from "./components/partials/Header"
import Footer from './components/partials/Footer'

const Page = () => {
  return (
    <BrowserRouter>
      <Template>
        <Header/>
        <Routes/>
        <Footer/>
      </Template>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return{

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)