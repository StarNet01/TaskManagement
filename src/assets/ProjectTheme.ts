import { createTheme } from '@mui/material/styles'
import './fonts/IranSans/css/fontiran.css'
import type {} from '@mui/lab/themeAugmentation'

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans'
  }
})

export default theme
