import 'package:flutter/material.dart';
import 'package:mp_tictactoe/provider/room_data_provider.dart';
import 'package:mp_tictactoe/widgets/custom_textfield.dart';
import 'package:provider/provider.dart';

class WaitingLobbyScreen extends StatefulWidget {
  const WaitingLobbyScreen({super.key});

  @override
  State<WaitingLobbyScreen> createState() => _WaitingLobbyScreenState();
}

class _WaitingLobbyScreenState extends State<WaitingLobbyScreen> {
  late TextEditingController roomIdController;

  @override
  void initState() {
    super.initState();

    roomIdController = TextEditingController(
      text: Provider.of<RoomDataProvider>(
        context,
        listen: false,
      ).roomData['_id'],
    );
  }

  @override
  void dispose() {
    super.dispose();
    roomIdController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const Text(
          'Waiting for players to join...',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        CustomTextfield(
          controller: roomIdController,
          hintText: 'Room ID',
          isReadOnly: true,
        ),
      ],
    );
  }
}
