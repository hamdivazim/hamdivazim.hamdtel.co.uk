import { ReactCusdis } from 'react-cusdis'

export default function CusdisComments (props){
  const appId = "acfa790b-5fb3-40b3-ba1e-d40f76943fa3"; 

  return(
    <div>
      <ReactCusdis
        id = "cusdis-thread"
        attrs={{
          host: "https://cusdis.com",
          appId: appId,
          pageId: props.attrs.pageId,
          pageTitle: props.attrs.pageTitle,
          pageUrl: props.attrs.pageUrl,
          theme: "dark",
        }}
      />
    </div>
  )
}