import React, { Component } from 'react';
import queryString from 'query-string';
import { BrowserRouter, Route, Link } from 'react-router-dom';
class ListNewsType extends Component {
    constructor(props){
        super(props);
        this.state={
            itemsListNewsType: [{}]
        }
    }
    handleDelele =(id)=>{
        fetch(`http://localhost:3001/api/admin/UpdateNewsType/${id[0]}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                BiXoa: !id[1],
            })
            })
            .then(
               (result)=>{
                  this.fecthAPI()
                  
               },
               (error)=>{
                    console.log(error);
               }
            )
    }
    fecthAPI = ()=>{
        let Newstypename = ""
        if(typeof(queryString.parse(this.props.location.search).Newstypename) != "undefined")
        {
            Newstypename = queryString.parse(this.props.location.search).Newstypename
        }
        fetch(`http://localhost:3001/api/admin/ListNewsType?Newstypename=${Newstypename}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemsListNewsType: result
          });
        },

        (error) => {
          this.setState({
            error
          });
        }
      );
    }
    componentDidMount(){
        this.fecthAPI()
    }
    render() {
        const items = this.state.itemsListNewsType.map((value, index) => {
            var icon = new String("glyphicon glyphicon-")
            if(value.BiXoa == 1)
            {
                icon = icon+"ok";
            }
            else
                icon = icon +"remove"
			return (
                 <tr key={"key_"+value.MaLoaiSanPham}>
                    <td>{value.MaLoaiSanPham}</td>
                    <td>{value.TenLoaiSanPham}</td>
                    <td>
                        <Link to={`/admin/UpdateNewsType/${value.MaLoaiSanPham}`}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </Link>

                    </td>
                    <td>
                        <a href="#" onClick={this.handleDelele.bind(this,[value.MaLoaiSanPham,value.BiXoa])} >
                            <span className={icon}></span>
                        </a>
                    </td>
             </tr>
			);
		});
        return (
            <div>
                <form  className="navbar-form pull-right" id="searchBox">
                    <div className="input-group">
                        <input type="text" className="form-control" name="Newstypename" placeholder="Tên loại sách"  ></input>
                    </div>
                    <button type="submit" className="btn"><span className="glyphicon glyphicon-search"></span></button>
                    <Link to="/admin/addNewsType"><button type="button" className="btn" ><span className="glyphicon glyphicon-plus"></span></button></Link>
                </form>
                <table className="table table-striped" id="orderList">
                <thead>
                    <tr className="nb active">
                        <td>Mã Loại</td>
                        <td colSpan="3">Tên Loại</td>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
                </table>
            </div>
        );
    }
}

export default ListNewsType;