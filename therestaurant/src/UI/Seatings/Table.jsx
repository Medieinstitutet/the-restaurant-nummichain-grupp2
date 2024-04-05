import './table.scss';

const Table = ({ numberOfStools = 6 }) => {
  return (
    <div className="tableContainer">
      <div className="table">
        {Array.from({ length: numberOfStools }).map((_, index) => (
          <div key={index} className="stool"></div>
        ))}
      </div>
    </div>
  );
};

export default Table;
// import './table.scss';

// const Table = () => {
//   return (
//     <div className="tableContainer">
//       <div className="chairs top">
//         {Array.from({ length: 3 }).map((_, index) => (
//           <div key={index} className="chair"></div>
//         ))}
//       </div>
//       <div className="table"></div>
//       <div className="chairs bottom">
//         {Array.from({ length: 3 }).map((_, index) => (
//           <div key={index} className="chair"></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Table;