import React from "react";
import {Admin,Resource,} from "react-admin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import dataProvider from "./components/DataProvider/dataProvider"; 


import { LocationCreate } from "./components/Location/LocationCreate";
import { LocationList } from "./components/Location/LocationList";
import { LocationEdit } from "./components/Location/LocationEdit";


import {CategoryCreate} from "./components/Category/CategoryCreate";
import { CategoryList } from "./components/Category/CategoryList";
import {CategoryEdit} from "./components/Category/CategoryEdit";


import { PlaceCreate } from "./components/Place/PlaceCreate";
import { PlaceList } from "./components/Place/PlaceList";
import { PlaceEdit } from "./components/Place/PlaceEdit";
import { TransportCreate } from "./components/Transport/TransportCreate";
import { TransportList } from "./components/Transport/TransportList";
import { TransportEdit } from "./components/Transport/TransportEdit";
import { HomePage } from "./User/HomePage";



const App = () => (
  <Router>
    <Routes>
 
       <Route path="/*" element={
         <Admin dataProvider={dataProvider}>
                    <Resource name="locations" create={LocationCreate} edit={LocationEdit} list={LocationList} />
                    <Resource name="categories" create={CategoryCreate} list={CategoryList} edit={CategoryEdit} />
                    <Resource name="places" create={PlaceCreate} edit={PlaceEdit} list={PlaceList} />
                    <Resource name="transport" create={TransportCreate} edit={TransportEdit} list={TransportList} />
                </Admin>
     
            } />
             <Route path="/homepage" element={<HomePage />} />
     </Routes>
    </Router>
);

export default App;
