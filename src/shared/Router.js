import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemList from '../components/ItemList';
import ItemAdd from '../components/ItemAdd';
import ItemEdit from '../components/ItemEdit';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ItemList />} />
        <Route path='/add' element={<ItemAdd />} />
        <Route path='/edit/:id' element={<ItemEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router