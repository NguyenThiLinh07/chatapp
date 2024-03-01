import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import ContextMenu from '@/components/common/ContextMenu';
import PhotoPicker from '@/components/common/PhotoPicker';
import PhotoLibrary from '@/components/common/PhotoLibrary';
import CapturePhoto from '@/components/common/CapturePhoto';

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById('photo-picker');
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  const contextMenuOptions = [
    {
      name: 'Task Photo',
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: 'Choose From Library',
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: 'Upload Photo',
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: 'Remove Photo',
      callback: () => {
        setImage('/default_avatar.png');
      },
    },
  ];

  const handleChangePhotoPicker = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = async (event: any) => {
      data.src = event.target.result;
      data.setAttribute('data-src', event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type === 'sm' && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full object-cover" fill />
          </div>
        )}
        {type === 'lg' && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full object-cover" fill />
          </div>
        )}
        {type === 'xl' && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`flex absolute top-0 left-0 gap-2 z-10 rounded-full flex-col items-center justify-center w-60 h-60 bg-photopicker-overlay-background
             ${hover ? 'visible' : 'hidden'}`}
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            >
              <FaCamera
                className="text-2xl"
                id="context-opener"
                onClick={(e) => showContextMenu(e)}
              />
              <span className="text-center" onClick={(e) => showContextMenu(e)} id="context-opener">
                Change profile photo
              </span>
            </div>
            <div className="h-60 w-60 flex justify-center">
              <Image src={image} alt="avatar" className="rounded-full object-cover" fill />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
          cordinates={contextMenuCordinates}
        />
      )}
      {showCapturePhoto && (
        <CapturePhoto setImage={setImage} hideCapturePhoto={setShowCapturePhoto} />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary setImage={setImage} hidePhotoLibrary={setShowPhotoLibrary} />
      )}
      {grabPhoto && <PhotoPicker onChange={handleChangePhotoPicker} />}
    </>
  );
}

export default Avatar;
