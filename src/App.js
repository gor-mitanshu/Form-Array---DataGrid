import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout/Layout";
// import DataGrids from "./components/pages/DataGrid";
import IDataGrid from "./components/pages/UserDataGrid";

function App () {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Navigate to="datagrid" replace /> } />
          <Route path="/datagrid" replace element={ <IDataGrid /> } />
          {/* <Route path="/datagrid" replace element={ <DataGrids /> } /> */ }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
