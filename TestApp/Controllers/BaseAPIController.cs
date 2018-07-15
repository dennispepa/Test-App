using TestApp.DBContext;
using FullStackApp.DBContext;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace TestApp.Controllers
{
    public class BaseAPIController : ApiController
    {
        //protected readonly UserDBEntities UserDB = new UserDBEntities();
        protected readonly UserContext db = new UserContext();
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
