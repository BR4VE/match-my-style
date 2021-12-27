export default class CreateCombineEndpointController {
  static async respond(request) {
    request.respondJSON({ hello: "Merlo" });
  }
}
