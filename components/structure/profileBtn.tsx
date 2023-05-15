import Link from "next/link";

export default function ProfileBtn() {
  return (
    <button className="w-6 h-6">
      <Link href="/profile" legacyBehavior>
        <a className="text-[#666]">
          <svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] h-[18px] relative"
            preserveAspectRatio="none"
          >
            <path
              opacity="0.7"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 2.8125C6.82538 2.8125 5.0625 4.57538 5.0625 6.75C5.0625 8.92462 6.82538 10.6875 9 10.6875C11.1746 10.6875 12.9375 8.92462 12.9375 6.75C12.9375 4.57538 11.1746 2.8125 9 2.8125ZM3.9375 6.75C3.9375 3.95406 6.20406 1.6875 9 1.6875C11.7959 1.6875 14.0625 3.95406 14.0625 6.75C14.0625 9.54594 11.7959 11.8125 9 11.8125C6.20406 11.8125 3.9375 9.54594 3.9375 6.75Z"
              fill="#666666"
              fill-opacity="0.8"
            />
            <path
              opacity="0.7"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.00009 12.9375C7.71637 12.9375 6.45526 13.2754 5.34355 13.9174C4.23184 14.5593 3.30871 15.4825 2.66695 16.5943C2.51164 16.8634 2.16763 16.9556 1.89858 16.8003C1.62952 16.645 1.53731 16.301 1.69262 16.0319C2.43311 14.7491 3.49827 13.6838 4.78101 12.9431C6.06375 12.2024 7.51887 11.8125 9.00009 11.8125C10.4813 11.8125 11.9364 12.2024 13.2192 12.9431C14.5019 13.6838 15.5671 14.7491 16.3076 16.0319C16.4629 16.301 16.3707 16.645 16.1016 16.8003C15.8326 16.9556 15.4885 16.8634 15.3332 16.5943C14.6915 15.4825 13.7683 14.5593 12.6566 13.9174C11.5449 13.2754 10.2838 12.9375 9.00009 12.9375Z"
              fill="#666666"
              fill-opacity="0.8"
            />
          </svg>
        </a>
      </Link>
    </button>
  );
}