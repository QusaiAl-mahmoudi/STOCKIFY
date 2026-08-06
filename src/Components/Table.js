
import React from 'react';

function Table({ headers, children }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default Table;

