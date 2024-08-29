//Main这里是将组件作为children转进父组件的，NavBar这里通过element转进去，两种方法，都可以避免props drilling的问题
//   return (
//     <>
//       <Navbar
//         element={
//           <>
//             <Logo />
//             <Search />
//             <NumResults movies={movies} />
//           </>
//         }
//       ></Navbar>
//       <Main>
//         <SearchBox movies={movies} />
//         <WatchedBox watched={watched} />
//       </Main>
//     </>
//   );
// }
export function Loader() {
  return <p className="loader">Loading....</p>;
}
