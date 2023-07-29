import { Table } from 'react-bootstrap' 
export function Cart(){
  return(
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>주문 정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>안녕</td>
            <td>1</td>
            <td>price</td>
            <td>안녕</td>
          </tr>
        </tbody>
      </Table> 
    </div>
  )
}