import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ItemDetail from '../components/ItemDetail';
import ItemAdd from '../components/ItemAdd';
import ItemEdit from '../components/ItemEdit';
import ItemRecentList from '../components/ItemRecentList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recent' element={<ItemRecentList />} />
        <Route path='/detail/:id' element={<ItemDetail />} />
        <Route path='/add' element={<ItemAdd />} />
        <Route path='/edit/:id' element={<ItemEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router