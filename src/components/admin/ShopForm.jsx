import React, {useState} from 'react';
import { useNotification } from "../../hooks";
import Submit from '../form/Submit';
import BrandForm from '../form/BrandForm';
import ImgSelector from '../ImgSelector';
import Selector from '../Selector';
import {typeOptions} from '../../utils/options';
import {validateShop} from '../../utils/validator';

const commonInputClassName = 'w-full border-gray-400 outline-none focus:border-secondary transition ';

const defaultShopInfo = {
    shopName: '',
    shopAbout: '',
    shopType: '',
    city: '',
    address: '',
    includes: [],
    shopImg: null
}

export default function ShopForm({onSubmit, busy}) {
    const [shopInfo, setShopInfo] = useState({...defaultShopInfo});
    const [userSelectedImg, setUserSelectedImg] = useState("");
    const { updateNotification } = useNotification();
    const handleSubmit = (e) => {
        e.preventDefault();
        const {error} = validateShop(shopInfo);
        if (error) {
          updateNotification("error", error);
        }
        const {includes, shopImg} = shopInfo;
        const formData = new FormData();
        const finalShopInfo = {
          ...shopInfo,
        };
        const finalIncludes = includes.map((c) => ({
          brand: c.brand.id,
          availability: c.availability,
        }));
        finalShopInfo.includes = JSON.stringify(finalIncludes);
        if (shopImg) {
          finalShopInfo.shopImg = shopImg;
        }
        for (let key in finalShopInfo) {
          formData.append(key, finalShopInfo[key]);
        }
        onSubmit(formData);
    }

const updateUserImg = (file) => {
    const url = URL.createObjectURL(file);
    setUserSelectedImg(url);
}

const handleChange = ({target}) => {
    const {value, name, files} = target;
    if (name === "shopImg") {
        const shopImg = files[0];
        updateUserImg(shopImg);
        return setShopInfo({...shopInfo, shopImg});
    }
    setShopInfo({...shopInfo, [name]: value });
}

const updateBrand = (brandInfo) => {
    const {includes} = shopInfo;
    setShopInfo({...shopInfo, includes: [...includes, brandInfo]});
}

const {shopName, shopAbout, city, address, includes, shopType} = shopInfo;

  return (
    <form onSubmit={handleSubmit} className='flex space-x-3'>
        <div className='w-[70%] space-y-3'>
            <div>
                <Label htmlFor='shopName'>Name</Label>
                <input value={shopName} onChange={handleChange} name='shopName' d='shopName' type="text" className={commonInputClassName + 'border-b-2 text-sm'}
                 placeholder='Nordstrom'/>
            </div>
            <div>
                <Label htmlFor='shopAbout'>About</Label>
                <textarea value={shopAbout} onChange={handleChange} name='shopAbout' id="shopAbout" className={commonInputClassName + 'border-b-2 resize-none h-32'}
                 placeholder='Introduce the shop here...'>

                </textarea>
            </div>
            <div>
                <Label htmlFor='city'>City</Label>
                <input value={city} onChange={handleChange} name='city' id='city' type='text' className={commonInputClassName + 'border-b-2 text-sm'} placeholder='Seattle'/>
            </div>
            <div>
                <Label htmlFor='address'>Address</Label>
                <input value={address} onChange={handleChange} name='address' id='address' type='text' className={commonInputClassName + 'border-b-2 text-sm'} placeholder='111 Terry Ave N'/>
            </div>
            <div>
                <div className="flex justify-between">
                <Label htmlFor='includes'>
                    Add Brands
                </Label>
                </div>
                <BrandForm onSubmit={updateBrand} />
            </div>

            <Submit value='Submit' onClick={handleSubmit} type="button"/>
        </div>
        <div className='w-[30%] space-y-5'>
            <ImgSelector
                name="shopImg"
                onChange={handleChange}
                selectedImg={userSelectedImg}
                accept="image/jpg, image/jpeg, image/png"
          />
          <Selector onChange={handleChange} name="shopType" value={shopType} options={typeOptions} label="Type"/>
        </div>
    </form>
  );
}

const Label = ({children, htmlFor}) => {
    return (
        <label htmlFor={htmlFor} className='font-semibold text-lg'>{children}</label>
    );
}