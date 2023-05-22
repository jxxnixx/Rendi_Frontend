// import { SubmitHandler, useForm } from "react-hook-form";
// import SubmitButton from "@/components/function/submitBtn";
// import Input from "@/components/function/input";
// import Layout from "@/layouts/layout";
// import NavBar from "@/components/structure/NavBar";
// import Head from "next/head";
// import Link from "next/link";

// interface LogInForm {
//   id: string;
//   password: string;

//   extraError?: string;
// }

// function LogIn() {
//   const {
//     register,
//     handleSubmit,
//     //watch,
//     formState: { errors },
//     //setError,
//   } = useForm<LogInForm>({
//     mode: "onChange",
//   });

//   const submitForm: SubmitHandler<LogInForm> = (data: any) => {
//     console.log(data);
//   };
//   // const submitForm: SubmitHandler<ILogInForm> = (data: any) => {
//   //   console.log(data);
//   // };

//   return (
//     <>
//       <Layout>
//         <NavBar />
//         <Head>
//           <title>LogIn</title>
//         </Head>
//         {/* <p className="top-[109px] text-4xl font-semibold text-center text-black"> */}
//         <div className=" flex flex-col items-center">
//           <div className="absolute top-[109px] text-center">
//             <p className="text-4xl font-semibold text-black">로그인</p>
//           </div>
//           <div className="absolute top-[173px] text-center">
//             <p className="text-lg text-[#666]">
//               Rendi만의 지능형 AI 검색을 경험해보세요!
//             </p>
//           </div>
//         </div>
//         ;
//         <div className="flex justify-center items-center h-screen">
//           {/* <form className="mt-40 flex flex-col" onSubmit={handleSubmit(submitForm)}> */}

//           <form
//             className="flex flex-col items-center gap-6 p-0 w-448 h-1017"
//             onSubmit={handleSubmit(submitForm)}
//           >
//             <Input
//               name="id"
//               label=""
//               type="id"
//               register={register("id", {})}
//               placeholder="아이디"
//               kind="text"
//               error={errors?.id?.message}
//             />
//             <Input
//               name="password"
//               label=""
//               type="password"
//               kind="text"
//               register={register("password", {})}
//               placeholder="비밀번호"
//               error={errors?.password?.message}
//               autoComplete="off"
//             />
//             {/* <div className="flex justify-center"> */}
//             {/* <button className="w-[588px] h-[54.92px] bg-black  text-[22px] font-semibold text-white border-2 border-FC435A rounded-[50px]">
//             로그인
//           </button> */}
//             <div className="flex text-center justify-center">
//               <SubmitButton
//                 type="submit"
//                 text="로그인"
//                 classname="flex justify-center items-center h-screen"
//               />
//             </div>

//             {/* </div> */}
//             {/* <div className=" flex justify-center items-center">
//             <div className="w-[592px] h-[15px] ">
//               <p className="absolute left-[472px] top-[527px] text-[13px] text-left text-black">
//                 Or continue with
//               </p>
//               <svg
//                 width={190}
//                 height={2}
//                 viewBox="0 0 190 2"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute left-[224.5px] top-[534.5px]"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 1H190" stroke="#DBDBDB" />
//               </svg>
//               <svg
//                 width={190}
//                 height={2}
//                 viewBox="0 0 190 2"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute left-[626.5px] top-[534.5px]"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M0 1H190" stroke="#DBDBDB" />
//               </svg>
//             </div>
//           </div> */}
//             <Link href="/signUp" legacyBehavior>
//               <button className="bg-white text-gray-600 text-base">
//                 Rendi가 처음이신가요?
//               </button>
//             </Link>
//           </form>
//         </div>
//         {/* </Layout> */}
//       </Layout>
//     </>
//   );
// }

// export default LogIn;
import { SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import NavBar from "@/components/structure/NavBar";
import Head from "next/head";
import Link from "next/link";

interface LogInForm {
  id: string;
  password: string;

  extraError?: string;
}

function LogIn() {
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
    //setError,
  } = useForm<LogInForm>({
    mode: "onChange",
  });

  const submitForm: SubmitHandler<LogInForm> = (data: any) => {
    console.log(data);
  };
  // const submitForm: SubmitHandler<ILogInForm> = (data: any) => {
  //   console.log(data);
  // };

  return (
    <>
      <Layout>
        <NavBar />
        <Head>
          <title>LogIn</title>
        </Head>
        <div className=" flex flex-col items-center">
          <div className="absolute top-[109px] text-center">
            <p className="text-4xl font-semibold text-black">로그인</p>
          </div>
          <div className="absolute top-[173px] text-center">
            <p className="text-lg text-[#666]">
              Rendi만의 지능형 AI 검색을 경험해보세요!
            </p>
          </div>
        </div>
        ;
        <div className="flex justify-center items-center h-screen">
          <form
            className="flex flex-col items-center gap-6 p-0 w-448 h-1017"
            onSubmit={handleSubmit(submitForm)}
          >
            <Input
              name="id"
              label=""
              type="id"
              register={register("id", {})}
              placeholder="아이디"
              kind="text"
              error={errors?.id?.message}
            />
            <Input
              name="password"
              label=""
              type="password"
              kind="text"
              register={register("password", {})}
              placeholder="비밀번호"
              error={errors?.password?.message}
              autoComplete="off"
            />

            <Link href="/signUp" legacyBehavior>
              <button className="bg-white text-gray-600 text-base">
                Rendi가 처음이신가요?
              </button>
            </Link>
            <div className="flex text-center justify-center">
              <SubmitButton
                type="submit"
                text="로그인"
                classname="flex justify-center items-center h-screen"
              />
            </div>
          </form>
        </div>
        {/* </Layout> */}
      </Layout>
    </>
  );
}

export default LogIn;
