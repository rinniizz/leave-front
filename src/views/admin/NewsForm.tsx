import {
  Grid,
  InputAdornment,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import React, { useState } from 'react';
import CustomOutlinedInput from 'src/components/forms/theme-elements/CustomOutlinedInput';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { IconBuildingArch, IconCheck, IconImageInPicture, IconUser } from '@tabler/icons-react';
import { postNews } from 'src/_Apis/PostNew';
import './style.css';
import NewsList from './NewsLists';

const NewsForm = () => {
  const [newsTopic, setNewsTopic] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!newsTopic || !newsDescription) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setErrorMessage(null);
      const response = await postNews(newsTopic, newsDescription, image);
      console.log('News created successfully:', response);
      setOpen(true);
      setNewsTopic('');
      setNewsDescription('');
      setImage(null);
      setImagePreviewUrl(null);
      window.location.reload();
    } catch (error) {
      if (typeof error === 'string') {
        console.log(error);
      } else if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>อัพโหลดข่าวประชาสัมพันธ์สำเร็จ</DialogTitle>
          <DialogContent>
            <IconCheck size="40" />
          </DialogContent>
        </Dialog>

        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bi-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            หัวข้อ
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomOutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-name"
            sx={{ width: '70%' }}
            placeholder="หัวข้อ"
            value={newsTopic}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewsTopic(e.target.value)}
          />
        </Grid>
        {/* 2 */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bi-company" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            รายละเอียด
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomOutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconBuildingArch size="20" />
              </InputAdornment>
            }
            id="bi-company"
            sx={{ width: '70%' }}
            placeholder="รายละเอียด"
            value={newsDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewsDescription(e.target.value)
            }
          />
        </Grid>
        {/* Image Upload */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bi-image" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            อัพโหลดรูปภาพ
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <input
            accept="image/*"
            id="bi-image"
            type="file"
            className="fillInput"
            onChange={handleImageChange}
          />
          <label htmlFor="bi-image">
            <Button color="secondary" variant="contained" component="span">
              <Box display="flex" justifyContent="center" marginRight={1}>
                <IconImageInPicture />
              </Box>
              เลือกรูปภาพ
            </Button>
          </label>
          {imagePreviewUrl && (
            <Box mt={2}>
              <img src={imagePreviewUrl} alt="Preview" className="img" />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12} container justifyContent="center">
          {errorMessage && (
            <Box color="error.main" mb={2}>
              {errorMessage}
            </Box>
          )}
          <Button sx={{ width: '50%' }} variant="contained" color="primary" onClick={handleSubmit}>
            อัพโหลดข่าวประชาสัมพันธ์
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <NewsList />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsForm;
