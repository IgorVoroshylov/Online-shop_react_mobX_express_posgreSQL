import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
   const {device} = useContext(Context);

   const pageCount = Math.ceil(device.totalCount / device.limit);
   const pages = [];
   for(let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
   }

   return(
         <Pagination className="mt-3 d-flex justify-content-center pagination">
            {
               pages.map(page =>
                  <Pagination.Item
                     active={device.page === page}
                     onClick={() => device.setPage(page)}
                     key={page}>{page}
                  </Pagination.Item>
                  )
            }
         </Pagination>
   )
});

export default Pages;