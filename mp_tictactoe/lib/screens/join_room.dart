import 'package:flutter/material.dart';
import 'package:mp_tictactoe/responsive/responsive.dart';
import 'package:mp_tictactoe/widgets/custom_button.dart';
import 'package:mp_tictactoe/widgets/custom_text.dart';
import 'package:mp_tictactoe/widgets/custom_textfield.dart';

class JoinRoomScreen extends StatefulWidget {
  static const String routeName = '/join-room';
  const JoinRoomScreen({super.key});

  @override
  State<JoinRoomScreen> createState() => _JoinRoomScreenState();
}

class _JoinRoomScreenState extends State<JoinRoomScreen> {
  final TextEditingController _gameIdController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();

  @override
  void dispose() {
    _gameIdController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(title: const Text('Join Room')),
      body: Responsive(
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const CustomText(
                text: 'Join Room',
                fontSize: 70,
                shadows: [Shadow(blurRadius: 40, color: Colors.blue)],
              ),
              SizedBox(height: size.height * 0.08),
              CustomTextfield(
                controller: _gameIdController,
                hintText: 'Enter your name',
              ),
              SizedBox(height: size.height * 0.04),
              CustomTextfield(
                controller: _gameIdController,
                hintText: 'Enter your game ID',
              ),

              SizedBox(height: size.height * 0.04),
              CustomButton(onTap: () {}, text: 'Create'),
            ],
          ),
        ),
      ),
    );
  }
}
