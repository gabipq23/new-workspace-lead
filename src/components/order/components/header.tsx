function Header() {
  return (
    // bg-[#f7f7f7]
    <div className=" z-2  ">
      <header className="flex justify-between gap-4 items-center p-2 bg-[#f1f1f1] py-4 px-4 md:px-10 lg:px-10  ">
        <img
          src="/Vivo-Empresas.png"
          className="h-5 md:h-8 hover:cursor-pointer"
          alt="Vivo Empresas"
        />

        <a
          href="https://www.goldempresas.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/Gold-Logo.png"
            className="h-5 md:h-10"
            alt="Gold Empresas"
          />
        </a>
      </header>
    </div>
  );
}

export default Header;
