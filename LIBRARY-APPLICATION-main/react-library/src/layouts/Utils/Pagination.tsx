export const Pagination: React.FC<{currrentPage: number, totalPages: number,
paginate: any}> =(props) =>{

    const pageNumber =[];
    if(props.currrentPage === 1){
        pageNumber.push(props.currrentPage);
        if(props.totalPages >= props.currrentPage+1){
            pageNumber.push(props.currrentPage+1);
        }
        if(props.totalPages >= props.currrentPage+2){
            pageNumber.push(props.currrentPage+2);
        }
    } else if(props.currrentPage > 1){
        if(props.currrentPage >= 3){
            pageNumber.push(props.currrentPage-2);
            pageNumber.push(props.currrentPage-1);

        }else{
            pageNumber.push(props.currrentPage-1);
        }

        pageNumber.push(props.currrentPage);

        if(props.totalPages >= props.currrentPage+1){
            pageNumber.push(props.currrentPage+1);
        }
        if(props.totalPages >= props.currrentPage+2){
            pageNumber.push(props.currrentPage+2);
        }
    }
    return(
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={() => props.paginate(1)}>
                    <button className="page-link">
                        First Page
                    </button>
                </li>
                {pageNumber.map(number =>(
                    <li key={number} onClick={()=> props.paginate(number)}
                        className={'page-item' + (props.currrentPage === number ? 'active' : '')}>
                            <button className="page-link">
                                {number}
                            </button>
                        </li>
                ))}
                <li className="page-item" onClick={() => props.paginate(props.totalPages)}>
                    <button className="page-link">
                        Last Page
                    </button>

                </li>
            </ul>

        </nav>
    );
}