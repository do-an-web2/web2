import React, { Component } from 'react';
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';
class UpdateNewsType extends Component {
    constructor(props){
        super(props)
        this.state ={
            items: [{}]
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        fetch(`http://localhost:3001/api/admin/findByNewsType/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    items: result
                });
            },

            (error) => {
                this.setState({
                    error
                });
            }
        );
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`http://localhost:3001/api/admin/UpdateNewsType/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenLoaiSanPham: this.refs.TenLoaiSanPham.value,
            })
            })
            .then(
               (result)=>{
                  this.setState({
                      redirect: true
                  })
                  
               },
               (error)=>{
                    console.log(error);
               }
            )
    }
    handleInput = (e)=>{
        const temp= this.state.items.slice()
        temp[0].TenLoaiSanPham = e.target.value
        this.setState({
            items: temp
        })
    }
    render() {
       if(this.state.redirect)
        {
            return <Redirect to = '/admin/ListNewsType' />
        } 
        return (
           <div className="panel">
            <h2 className="page-header text-center">Cập Nhật Loại sách #{this.props.match.params.id}</h2>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}  className="frmEdit w40p center-block">
                    Tên Loại: 
                        <input onChange={this.handleInput} type="text" className="form-control" value={this.state.items[0].TenLoaiSanPham} ref="TenLoaiSanPham"></input>
                        <br></br>
                        <button type="submit" className="btn btn-primary center-block">Lưu</button>
                </form>
            </div>
        </div>
        );
    }
}

export default UpdateNewsType;