import './App.scss'
import {
  RouterProvider,
} from "react-router-dom";

import { SWRConfig } from 'swr';
import { defaultFetcher } from './api'
import { router } from './router';
function App() {



  return (
    <SWRConfig
      value={{
        fetcher: defaultFetcher,
        revalidateOnFocus: false,
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  )
}

export default App
