import {createText,createBox} from '@shopify/restyle';
import {moderateScale} from 'react-native-size-matters';

const theme ={
    colors:{
        white:'#fff',
        primary:'#2133A0',
        text: '#272829',
        button:'#7c72ff',
        color:'#0C0D34',
        grey: '#BABD98',
        danger:'#ff0055',
        green:'#0BBF29',
        black:'#000',
    },
    spacing:{
        s:8,
        m:16,
        l:24,
        xl:40
    },
    borderRadius:{
        s:4,
        m:10,
        l:25
    },
    textVariants:{
        title:{
            fontSize:moderateScale(15),
            fontFamily:'Gotham-Black',
            color:'white',

        },
        body:{
            fontSize:16,
            fontFamily:'Gotham-Medium',
            lineHeight:25,
            text:'text'
        },
        button:{
            fontSize:15,
            fontFamily:'Gotham-Bold',
            color:'text'
        },
        breakpoints:{

        }

    }
}
// export type Theme = typeof theme;
// export const Text =createText<Theme>();
// export const Box = createBox<Theme>();
export default theme;