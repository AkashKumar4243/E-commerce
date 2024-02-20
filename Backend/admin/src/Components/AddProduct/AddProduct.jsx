import React, { useState } from 'react'
import upload_area from "../../assets/Admin Panel Assets/upload_area.svg"
import './AddProduct.css'

const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState ({
        name : "",
        image : "",
        category  : "women",
        new_price : "",
        old_price : ""
    });

    const imageHandler = (e) =>{
        console.log(e.target.files);
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        //console.log(e.target.value);
        setProductDetails({...productDetails,[e.target.name] : e.target.value});
    }

    const Added = (data) =>{
        console.log(data);
        alert('Product Added');
        setProductDetails(data);
    }

    const Add_Product = async () =>{
        //console.log(productDetails);

        let responsedata ;
        let product = productDetails;
       //console.log(product);
        let formData = new FormData();
        formData.append('Product',image);
        await fetch ('http://localhost:4000/upload',{
            method : 'Post',
            headers : {
                Accept : 'application/json',
            },
            body : formData
        }).then((res) => res.json()).then((data) =>responsedata = data);

        if(responsedata.Status) {
            //console.log(responsedata);
            product.image = responsedata.image_url;
            await fetch ('http://localhost:4000/addProduct',{
                method : 'Post',
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(product)
            }).then((res) => res.json()).then((data) => {data.success ? Added(product) : alert('Failed to add product')});
            
        }
    }


  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input type="text" name='name' placeholder='Type Here' value={productDetails.name} onChange={changeHandler} />
        </div>
        <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Old Price </p>
            <input type="text" name='old_price' placeholder='Type Here' value={productDetails.old_price} onChange={changeHandler}  />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" name='new_price' placeholder='Type Here' value={productDetails.new_price} onChange={changeHandler}  />
        </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select name='category' className='add-product-selector' value={productDetails.category} onChange={changeHandler} >
                <option value="women">women</option>
                <option value="men">men</option>
                <option value="kid">kid</option>
            </select>
        </div>
        <div className="product-itemfield">
            <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) :upload_area} alt="" className='addproduct-thumnail-img' />
            </label>
            <input type="file" onChange={imageHandler} name='image' id='file-input' hidden />
        </div>
        <button className='addproduct-btn' onClick={() => Add_Product()} >Add</button>
    </div>
  )
}

export default AddProduct