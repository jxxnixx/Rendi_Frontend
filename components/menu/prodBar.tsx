export default function ProdBar() {
  return (
    <nav className="relative">
      <div className=" h-[60px] text-[14px] text-[#666] bg-white py-[11px] text-base flex shadow-md space-x-[60px] items-center justify-center">
        <button>
          <div>전체</div>
        </button>

        <button>
          <p>상의</p>
        </button>

        <button>
          <p>아우터</p>
        </button>

        <button>
          <p>원피스/세트</p>
        </button>

        <button>
          <p>팬츠</p>
        </button>

        <button>
          <p>스커트</p>
        </button>

        <button>
          <p>트레이닝</p>
        </button>

        <button>
          <p>가방</p>
        </button>

        <button>
          <p>언더웨어</p>
        </button>
        <button>
          <p>비치웨어</p>
        </button>

        <button>
          <p>패션잡화</p>
        </button>

        <button>
          <p>기타</p>
        </button>
      </div>
    </nav>
  );
}
