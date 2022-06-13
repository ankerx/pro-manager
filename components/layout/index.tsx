import Nav from "./Navbar"

const Layout = ({ children }: any) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      {children}
    </div>
  )
}

export default Layout