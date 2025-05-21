export default function SetupLoading() {
 return (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <div className="animate-pulse">
     <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
     <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
   </div>

   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
     <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
       <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
       </div>
       <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
       </div>
      </div>

      <div className="animate-pulse">
       <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
       <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      <div className="animate-pulse">
       <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
       <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      <div className="space-y-4">
       <div className="h-6 bg-gray-200 rounded w-1/4"></div>
       <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
       </div>
      </div>

      <div className="animate-pulse">
       <div className="h-10 bg-gray-200 rounded"></div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 