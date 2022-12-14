import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Section,
  Title,
  MainImg,
  Dropdown,
  CreateFoodTruck,
  TypeInfo,
  HashTagBtn,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  SettingDoneBtn,
  Toggle,
  OpenOrClose,
  Avatar,
} from './styles';
import { Spinner, ErrorBoundary } from '../../components';
import { COLOR } from '../../constants';
import MenuList from './MenuList';
import UpdateForm from './UpdateForm';
import { withAuth } from '../../components/Hoc';
import { useSetting } from '../../hooks/useSetting';
import { atoms } from '../../store';

function FoodTruckSetting() {
  const [dropDown, setDropDown] = useState('korean');
  const [toggleStatus, setToggleStatus] = useState(false);
  const [img, setImg] = useState('');
  const [newMenuImg, setNewMenuImg] = useState('');
  const [storeId, setStoreId] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeImage, setStoreImage] = useState('');
  const [storeContent, setStoreContent] = useState('');
  const [storeTag, setStoreTag] = useState('');
  const [storeTime, setStoreTime] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeNumber, setStoreNumber] = useState('');

  const { postMutateMenu, postMutateInfo, patchMutateInfo, deleteMutateInfo } =
    useSetting();

  const [loginInfo, setLoginInfo] = useRecoilState(atoms.loginInfo);

  const { id } = useParams();

  useEffect(() => {
    if (loginInfo.storeId === null) {
      setLoginInfo({ storeId: false, localId: Number(id) });
    } else {
      setStoreId(loginInfo.storeId);
    }
  }, [loginInfo]);

  const [inputs, setInputs] = useState({
    name: '',
    time: '',
    address: '',
    phone: '',
    number: '',
    ask: '',
    newMenuName: '',
    newMenuPrice: '',
    newMenuContent: '',
    tag: '',
  });

  const {
    name,
    time,
    address,
    phone,
    number,
    ask,
    newMenuName,
    newMenuPrice,
    newMenuContent,
    tag,
  } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeNewImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImg = reader.result;
      setNewMenuImg(resultImg);
    };
  };

  const onChangeImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImg = reader.result;
      setImg(resultImg);
    };
  };

  const handleTypeChange = (e) => {
    setDropDown(e.target.value);
  };

  const categories = [
    { value: 'korean', type: '??????' },
    { value: 'chinese', type: '??????' },
    { value: 'western', type: '??????' },
    { value: 'japanese', type: '??????' },
    { value: 'snackbar', type: '??????' },
    { value: 'cafe', type: '?????????' },
    { value: 'nightsnack', type: '??????' },
  ];

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Spinner color={COLOR.NAVY} size={100} />}>
        <Section>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('?????? ?????? ??????????????? ?????? ???????????????????')) {
                deleteMutateInfo({ storeId });
                alert('??????????????? ?????? ???????????????.');
                setLoginInfo({ storeId: null, localId: Number(id) });
              }
            }}
          >
            ?????? ??????
          </button>
          <Title>?????? ??????</Title>

          {storeId ? (
            <UpdateForm
              img={img}
              onChange={onChange}
              handleTypeChange={handleTypeChange}
              dropDown={dropDown}
              name={name}
              time={time}
              address={address}
              phone={phone}
              number={number}
              tag={tag}
              ask={ask}
              categories={categories}
              storeId={storeId}
              onChangeImg={onChangeImg}
              setStoreName={setStoreName}
              setStoreImage={setStoreImage}
              setStoreContent={setStoreContent}
              setStoreTag={setStoreTag}
              setStoreTime={setStoreTime}
              setStorePhone={setStorePhone}
              setStoreAddress={setStoreAddress}
              setStoreNumber={setStoreNumber}
            />
          ) : (
            <CreateFoodTruck>
              <MainImg>
                <Avatar>
                  <div>
                    <img src={img} alt="???????????? ????????? ?????????" />
                    <label htmlFor="file">??????</label>
                    <input
                      type="file"
                      id="file"
                      onChange={onChangeImg}
                      accept="image/*"
                    />
                  </div>
                </Avatar>

                <Dropdown>
                  <select
                    type="button"
                    onChange={handleTypeChange}
                    value={dropDown}
                  >
                    {categories.map((res, index) => {
                      return (
                        <option
                          key={res.type}
                          id={`${index}`}
                          value={res.value}
                        >
                          {res.type}
                        </option>
                      );
                    })}
                  </select>
                </Dropdown>
              </MainImg>

              <ul>
                <li>
                  <TypeInfo>
                    <input
                      placeholder="???????????? (??????)"
                      name="name"
                      value={name}
                      onChange={onChange}
                    />
                  </TypeInfo>
                </li>

                <li>
                  <TypeInfo>
                    <input
                      placeholder="???????????? (??????)"
                      name="time"
                      value={time}
                      onChange={onChange}
                    />
                  </TypeInfo>
                </li>

                <li>
                  <TypeInfo>
                    <input
                      placeholder="?????? (??????)"
                      name="address"
                      value={address}
                      onChange={onChange}
                    />
                  </TypeInfo>
                </li>

                <li>
                  <TypeInfo>
                    <input
                      placeholder="???????????? (??????)"
                      name="phone"
                      value={phone}
                      onChange={onChange}
                    />
                  </TypeInfo>
                </li>

                <li>
                  <TypeInfo>
                    <input
                      placeholder="??????????????? (??????)"
                      name="number"
                      value={number}
                      onChange={onChange}
                    />
                  </TypeInfo>
                </li>
              </ul>

              <DeleteTag>
                <input
                  placeholder="??????"
                  value={tag}
                  name="tag"
                  onChange={onChange}
                />

                <HashTagBtn
                  onClick={() => {
                    alert('?????? ??????');
                  }}
                >
                  ???????????? ??????
                </HashTagBtn>
              </DeleteTag>

              <textarea
                placeholder="???????????? (??????)"
                name="ask"
                value={ask}
                onChange={onChange}
              />
            </CreateFoodTruck>
          )}

          <OpenOrClose>
            <Toggle>
              <input
                type="checkbox"
                onClick={() => {
                  if (toggleStatus === false) {
                    alert('????????? ????????? ?????????????????????');
                    setToggleStatus(true);
                  }

                  if (toggleStatus === true) {
                    setToggleStatus(false);
                  }
                }}
                id="toggle"
                hidden
              />
              <label htmlFor="toggle">
                <span />
              </label>
            </Toggle>
            <span>{toggleStatus ? '?????? ????????????' : '?????????'}</span>
          </OpenOrClose>

          <AddFood>
            <Title>?????? ?????? ??????</Title>

            <CreateFood>
              <Avatar>
                <div>
                  <img alt="????????? ?????? ?????????" src={newMenuImg} />
                  <label htmlFor="file1">??????</label>
                  <input
                    type="file"
                    id="file1"
                    onChange={onChangeNewImg}
                    accept="image/*"
                  />
                </div>
              </Avatar>
              <TypeInfo>
                <input
                  placeholder="?????? ??????"
                  name="newMenuName"
                  value={newMenuName}
                  onChange={onChange}
                />

                <input
                  placeholder="?????? ??????"
                  name="newMenuContent"
                  value={newMenuContent}
                  onChange={onChange}
                />

                <input
                  placeholder="?????? ??????"
                  name="newMenuPrice"
                  value={newMenuPrice}
                  onChange={onChange}
                />
              </TypeInfo>
              <button
                type="button"
                onClick={() => {
                  if (storeId) {
                    if (
                      newMenuImg &&
                      newMenuName &&
                      newMenuContent &&
                      newMenuPrice
                    ) {
                      alert('????????? ??????????????? ??????????????????');
                      const value = {
                        name: newMenuName,
                        price: newMenuPrice,
                        content: newMenuContent,
                        image: newMenuImg,
                      };
                      postMutateMenu({ storeId, value });
                    } else {
                      alert('?????? ????????? ????????? ?????????');
                    }
                  } else {
                    alert('????????? ?????? ????????? ?????????');
                  }
                }}
              >
                ??????
              </button>
            </CreateFood>

            <UpdateFood>
              <Title>?????? ?????? ??????</Title>

              {storeId ? <MenuList storeId={storeId} /> : null}

              <SettingDoneBtn>
                <button
                  type="button"
                  onClick={() => {
                    if (!storeId) {
                      if (
                        phone &&
                        number &&
                        name &&
                        dropDown &&
                        time &&
                        address &&
                        img
                      ) {
                        alert('????????? ??????????????? ??????????????????');
                        alert('???????????? ??? ?????????????????? ?????? ??????????????????');
                        const value = {
                          localId: id,
                          storePhone: phone,
                          storeNumber: number,
                          storeStatus: toggleStatus ? 'BRAKE' : 'OPEN',
                          storeName: name,
                          storeContent: ask,
                          storeImage: img,
                          storeType: dropDown,
                          storeTime: time,
                          storeWaitTime: '15???~30???',
                          storeAddress: address,
                          storePayment: '??????',
                          storeTag: tag,
                        };
                        postMutateInfo({ value });
                      } else {
                        alert('???????????? ?????? ?????? ?????? ????????? ?????????');
                      }
                    } else {
                      alert('?????? ????????? ????????????');
                    }
                  }}
                >
                  ?????? ??????
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (storeId) {
                      if (img) {
                        alert(
                          '??????????????? ????????? ?????????????????????. ???????????? ????????????',
                        );
                        const value = {
                          localId: id,
                          storePhone: phone || storePhone,
                          storeNumber: number || storeNumber,
                          storeStatus: toggleStatus ? 'BRAKE' : 'OPEN',
                          storeName: name || storeName,
                          storeContent: ask || storeContent,
                          storeImage: img || storeImage,
                          storeType: dropDown,
                          storeTime: time || storeTime,
                          storeWaittime: '15???~30???',
                          storeAddress: address || storeAddress,
                          storePayment: '??????',
                          storeTag: tag || storeTag,
                        };
                        patchMutateInfo({ storeId, value });
                      } else {
                        alert(
                          '???????????? ???????????? ???????????? ????????? ???????????? ?????????',
                        );
                      }
                    } else {
                      alert('????????? ?????? ???????????? ?????????');
                    }
                  }}
                >
                  ?????? ????????????
                </button>
              </SettingDoneBtn>
            </UpdateFood>
          </AddFood>
        </Section>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default withAuth(FoodTruckSetting);
