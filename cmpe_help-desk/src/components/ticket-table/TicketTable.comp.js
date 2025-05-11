import PropTypes from 'prop-types'
import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const TicketTable = ({tickets}) => {

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Subjects</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Category</th>
          <th>Opened Date</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length ? tickets.map(row=>
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>
            <Link to={`/ticket/${row.id}`}>
              {row.subject}
            </Link>
            </td>
          <td>{row.priority}</td>
          <td>{row.status}</td>
          <td>{row.category}</td>
          <td>{row.addedAt}</td>
        </tr>
        ):
        (<tr>
          <td colSpan= "4" className='text-center'>No tickets to show</td>
        </tr>)}
      </tbody>
    </Table>
  )
}

TicketTable.propTypes = {
  tickets: PropTypes.array.isRequired,
}
